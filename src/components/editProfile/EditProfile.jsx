import React, { useContext, useRef, useState } from 'react'
import { GrClose } from "react-icons/gr";
import './EditProfile.scss'
import { MdFileUpload } from "react-icons/md";
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function EditProfile({ openEditProfile, setOpenEditProfile }) {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL

    const { user } = useContext(AuthContext)

    const { data: updatedUser } = useQuery({
        queryKey: ["user",user._id],
        queryFn: async () => {
            const res = await axios.get(`${apiBaseURL}/user/${user._id}`)
            return res.data
        }
    })

    const [userInputs, setUserInputs] = useState({
        profilePic: null,
        coverPic: null,
        name: '',
        school: '',
        college: '',
        worksAt: '',
        currentAddress: '',
        permanentAddress: '',
        gender: null,
        dateOfBirth: '',
    })

    const profilePicProgress = useRef()
    const coverPicProgress = useRef()
    const [isDisabled, setIsDisabled] = useState(false)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({ userId, userInputs }) => {
            return axios.put(`${apiBaseURL}/user/${userId}`, userInputs)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const handleUserInputChange = (e) => {
        setUserInputs(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    const uploadPicToFirebase = async (file, imageType, progressRef) => {
        setIsDisabled(true)

        const storageRef = ref(storage, `${Date.now()}${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressRef.current.value = progress
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUserInputs(pre => ({ ...pre, [imageType]: downloadURL }))
                    progressRef.current.value = 0
                    setIsDisabled(false)
                });
            }
        )
    }

    const updateProfile = async (e) => {
        e.preventDefault();

        mutation.mutate({ userId: user._id, userInputs })

        if (userInputs.profilePic) {
            await axios.post(`${apiBaseURL}/post`, {
                userId: user._id,
                img: userInputs.profilePic,
            })
             queryClient.invalidateQueries({ queryKey: ['allposts'] })
             queryClient.invalidateQueries({ queryKey: ['user'] })
        }
        if (userInputs.coverPic) {
            await axios.post(`${apiBaseURL}/post`, {
                userId: user._id,
                img: userInputs.coverPic,
            })
             queryClient.invalidateQueries({ queryKey: ['allposts'] })
             queryClient.invalidateQueries({ queryKey: ['user'] })
        }

        setOpenEditProfile(!openEditProfile)
    }

    return (<>
        <div className='edit-profile-top'>
            <h1>Edit Profile</h1>
            <div
                className="close-button"
                onClick={e => setOpenEditProfile(!openEditProfile)}
            >
                <GrClose />
            </div>
        </div>
        <hr />
        <form className="edit-profile-bottom" onSubmit={updateProfile}>
            <div className="profile-pic">
                <h2>Profile picture</h2>
                <div className="right">
                    <div className="image-container">
                        <img
                            src={
                                userInputs.profilePic
                                    ? userInputs.profilePic
                                    : updatedUser.profilePic
                                        ? updatedUser.profilePic
                                        : '/avatar.png'
                            }
                            alt="" />
                        <progress ref={profilePicProgress} style={{ width: '100px' }} value="0" max="100" />
                    </div>
                    <label className='upload-button' htmlFor='profilePic' >
                        <input
                            type="file"
                            id='profilePic'
                            style={{ display: 'none' }}
                            onChange={(e) => uploadPicToFirebase(e.target.files[0], 'profilePic', profilePicProgress)}
                        />
                        <MdFileUpload />
                        Upload New
                    </label>
                </div>
            </div>
            <div className="cover-pic">
                <h2>Cover picture</h2>
                <div className="right">
                    <div className="image-container">
                        <img
                            src={
                                userInputs.coverPic
                                    ? userInputs.coverPic
                                    : updatedUser.coverPic
                                        ? updatedUser.coverPic
                                        : '/coverpic.jpg'
                            }
                            alt="" />
                        <progress ref={coverPicProgress} style={{ width: '100px' }} value="0" max="100" />
                    </div>
                    <label className='upload-button' htmlFor='coverPic' >
                        <input
                            type="file"
                            id='coverPic'
                            style={{ display: 'none' }}
                            // ref={coverPic}
                            onChange={(e) => uploadPicToFirebase(e.target.files[0], 'coverPic', coverPicProgress)}
                        />
                        <MdFileUpload />
                        Upload New
                    </label>
                </div>
            </div>

            <hr />

            <h2>Intro</h2>

            <div className="intro-item">
                <h3>Name</h3>
                <input type="text" name="name" onChange={handleUserInputChange} />
            </div>
            <div className="intro-item">
                <h3>Works At</h3>
                <input type="text" name='worksAt' onChange={handleUserInputChange} />
            </div>
            <div className="intro-item">
                <h3>Studied At (School)</h3>
                <input type="text" name='school' onChange={handleUserInputChange} />
            </div>
            <div className="intro-item">
                <h3>Studied At (College)</h3>
                <input type="text" name='college' onChange={handleUserInputChange} />
            </div>
            <div className="intro-item">
                <h3>Lives In</h3>
                <input type="text" name='currentAddress' onChange={handleUserInputChange} />
            </div>
            <div className="intro-item">
                <h3>From</h3>
                <input type="text" name='permanentAddress' onChange={handleUserInputChange} />
            </div>

            <hr />

            <div className='gender' onChange={handleUserInputChange}>
                <h3>Gender</h3>
                <div className="rdaio-buttons">
                    <label htmlFor='male' className='radio-button'>
                        <input type="radio" id='male' name='gender' value="male" />
                        Male
                    </label>
                    <label htmlFor='female' className='radio-button'>
                        <input type="radio" id='female' name='gender' value="female" />
                        Female
                    </label>
                    <label htmlFor='other' className='radio-button'>
                        <input type="radio" id='other' name='gender' value="other" />
                        Other
                    </label>
                </div>
            </div>

            <hr />

            <div className="date-of-birth">
                <h3>Date Of Birth</h3>
                <input
                    type="date"
                    name='dateOfBirth'
                    onChange={handleUserInputChange}
                    max={new Date().toISOString().split("T")[0]}
                />
            </div>

            <hr />

            <button
                className={isDisabled ? "disabled-submit-button" : "submit-button"}
                type='submit'
                disabled={isDisabled}
            >
                Save Changes
            </button>
        </form>
    </>)
}

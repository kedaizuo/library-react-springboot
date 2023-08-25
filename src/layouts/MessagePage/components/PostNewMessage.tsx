import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import MessageModel from "../../../models/MessageModel";

export const PostNewMessage = ()=>{
    const {authState}= useOktaAuth();
    const [title, setTitle] = useState('')
    const [question, setQuestion] =useState('')
    const [displayWarning, setDisplayWarning] = useState(false)
    const [ displaySuccess, setDisplaySuccess] = useState(false)


    async function submitNewQuestion(){
        const url = `https://libsummeraa.com/api/messages/secure/add/message`;
        if(authState?.isAuthenticated && title !=='' &&question!==''){
            const messageRequestModel:MessageModel = new MessageModel(title, question);
            const requestOptions={
                method:'POST',
                headers:{
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(messageRequestModel)
            }

            const submitNewQuestionResponse = await fetch(url, requestOptions)
            if(!submitNewQuestionResponse.ok){
                throw new Error('Something went wrong.')
            }

            setTitle('')
            setQuestion('')
            setDisplayWarning(false)
            setDisplaySuccess(true)

        }
        else{
            setDisplaySuccess(false)
            setDisplayWarning(true)
        }
    }
    return(
        <div className="card mt-3">
            
            <div className="card-header">
                Ask question to Luv 2 Read Admin
            </div>
            <div className="card-body">
                <form action="POST">
                    {displayWarning &&
                        <div className="alert alert-danger" role='alert'>
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess &&
                        <div className="alert alert-success" role="alert">
                            Question added successfully
                        </div>
                    }
                    <div className="mb-3">
                        <label htmlFor="form-label">
                            Title
                        </label>
                        <input type="text" className="form-control" id="exampleFormControl"
                            placeholder="Title" onChange={e => setTitle(e.target.value)} value={title}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="form-label">
                            Question
                        </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1"  rows={3}
                            onChange={e =>setQuestion(e.target.value)} value={question}></textarea>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary mt-3" onClickCapture={submitNewQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
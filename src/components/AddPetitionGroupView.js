import { usePostDataAuth } from   '../hooks/usePostData';
import AddPetitionGroupForm from './AddPetitionGroupForm';
import { LoadingBox } from './MiscControls';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const AddPetitionGroupView = () => {
    const { loggedInUser } = useContext(AppContext);
    const { post:postGroup, confirmMessage, loading, error, errorMessage } = usePostDataAuth({ 
        url:'/api/petition_groups', 
        confirmText:'Added Petition Group'
    });

    if(!loggedInUser) {
        return <Redirect to='/login' />
    }
    return (
        <section>
            <h2>Add Petition Group</h2>
            <p>Use this form to add a new petition group.</p>
            <AddPetitionGroupForm onSubmit={postGroup}/>
            {confirmMessage && <p>{confirmMessage}</p>}
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
        </section>
    );
}

export default AddPetitionGroupView

import { useLocation, Link, Redirect } from 'react-router-dom';
import useFetchDataAuth from  '../hooks/useFetchDataAuth'
import { LoadingBox } from './MiscControls';
import { useRef, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const PetitionGroupPetitionsSection = ({ petitionGroupId }) => {
    const getRequestParams = useRef({ petition_group_id : petitionGroupId });
    const { data:petitions, loading, error, errorMessage } = useFetchDataAuth({ 
        url:'/api/petitions', 
        getRequestParams:getRequestParams.current
    });
    
    return (
      <>
      <br/><strong>Petitions</strong>
      <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
      <ul className='petitions_list_group'>
      { (petitions && petitions.length > 0) ? petitions.map((petition, index) => 
        <li className='petitions_list_item' key={index}>
            <Link className='petitions_list_btn' to={`/petitions/${petition['id']}`}>View</Link>
            <span>Subject: {petition['subject']}</span>
        </li>) : 
        <p>This group has no petition yet.</p>
      }
      </ul>
        {petitions && <div className='add_petition_group_btn'>
          <Link className='add_petition_group_text' to={`/add_petition/${petitionGroupId}`}>Add New Petition</Link>
        </div>}
      </>
    );
};

const PetitionGroupMembersList = ({ petitionGroupId }) => {
    const getRequestParams = useRef({ petition_group_id : petitionGroupId });
    const { data:members, loading, error, errorMessage } = useFetchDataAuth({ 
        url:'/api/members', 
        getRequestParams:getRequestParams.current
    });
    
    return (
      <>
      <br/><strong>Members</strong>
      <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
      <ul className='users_list_group'>
      { (members && members.length > 0) ? members.map((member) => 
        <li className='users_list_item' key={member['email']}>{member['email']}</li>) : 
        <p>This group has no members yet.</p>
      }
      </ul>
      </>
    );
};
  
const PetitionGroupSummary = ({ petitionGroup }) => {
return (
    <p>
        <strong>id:</strong> {petitionGroup['id']}<br/>
        <strong>listserv_email:</strong> {petitionGroup['listserv_email']}<br/>
    </p>
    );
};

const PetitionGroupView = ({ basePath }) => {
  const { loggedInUser } = useContext(AppContext);
  const location = useLocation();
  const petitionGroupId = location.pathname.replace(basePath, '');
  const { data:petitionGroup, loading, error, errorMessage } = useFetchDataAuth({ url:`/api/petition_groups/${petitionGroupId}` });

  if(!loggedInUser) {
    return <Redirect to='/login' />
  }
  return (
      <section>
          <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
          { petitionGroup && (<>
          <h2>Petition Group: {petitionGroup.group_name}</h2>
          <PetitionGroupSummary petitionGroup={petitionGroup} />
          <PetitionGroupMembersList petitionGroupId={petitionGroupId} />
          <PetitionGroupPetitionsSection petitionGroupId={petitionGroup['id']} /></>) }
      </section>
  );
}

export default PetitionGroupView;
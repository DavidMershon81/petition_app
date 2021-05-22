import { useLocation, Link } from 'react-router-dom';
import useFetchData from  '../hooks/useFetchData'
import { LoadingBox } from './MiscControls';

const PetitionGroupMembersList = ({ petitionGroupId }) => {
    const { data:members, loading, error } = useFetchData({ getUrl:`/api/members/${petitionGroupId}` });
  
    return (
      <>
      <br/><strong>Members</strong>
      <LoadingBox loading={loading} error={error} />
      <ul className='users_list_group'>
      { (members && members.length > 0) ? members.map((member) => 
        <li className='users_list_item' key={member['email']}>{member['email']}</li>) : 
        <p>This petition has no members yet.</p>
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
    const location = useLocation();
    const petitionGroupId = location.pathname.replace(basePath, '');
    const { data:petitionGroup, loading, error } = useFetchData({ getUrl:`/api/petition_groups/${petitionGroupId}` });

    return (
        <section>
            {petitionGroup && <h2>Petition Group: {petitionGroup.group_name}</h2>}
            <LoadingBox loading={loading} error={error} />
            {petitionGroup && <PetitionGroupSummary petitionGroup={petitionGroup} /> }
            <PetitionGroupMembersList petitionGroupId={petitionGroupId} />
        </section>
    );
}

export default PetitionGroupView;
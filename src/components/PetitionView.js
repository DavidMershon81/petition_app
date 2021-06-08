import { useLocation } from 'react-router-dom';
import useFetchDataAuth from  '../hooks/useFetchDataAuth'
import { LoadingBox } from './MiscControls';
import AddTestSignatureForm from './AddTestSignatureForm';
import { useRef } from 'react';

const TestSignatureUsers = ({ petition, onSignatureSubmit, users, loading, error, errorMessage }) => {
    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
            { users && <>
                <h4>Users Who Can Sign</h4>
                <ul className='test_signature_user_group'>
                { users && users.map((user) => 
                    <li key={user['id']} className='users_list_item test_signature_user_box'>
                        <p>id:{user['id']} | {user['email']} | {user['first_name']} {user['last_name']}</p>
                        <AddTestSignatureForm onSubmit={onSignatureSubmit} petition={petition} user={user}/>
                    </li>
                )}
                { users && users.length < 1 && <li>No users can sign this petition.</li>}
                </ul>
            </>}
        </section>
    );
}

const TestSignaturesList = ({ petition }) => {
    const getSignatureParams = useRef({ petition_id : petition['id'] });
    const { data:signatures, addData:addSignature, loading, error, errorMessage } = useFetchDataAuth({ 
        url:'/api/signatures', 
        getRequestParams:getSignatureParams.current
    });

    const getUsersParams = useRef(petition ? { petition_group_id : petition['petition_group_id'] } : {});
    const { data:users, loading:uLoading, error:uError, errorMessage:uErrorMessage } = useFetchDataAuth({ 
        url:'/api/users', 
        getRequestParams:getUsersParams.current
    });

    const onSignatureSubmit = (data) => {
        addSignature(data);
    }

    const userForSig = (sig) => {
        return users.filter(u => u['id'] === sig['user_id'])[0];
    }   

    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>
            { signatures && <>
                <h4>Signatures</h4>
                <ul className='test_signature_user_group'>
                { (signatures && users) && signatures.map((sig) => 
                    <li key={sig['id']} className='users_list_item test_signature_user_box'>
                        <span>id:{sig['id']}</span>
                        <span>petition_id:{sig['petition_id']}</span>
                        <span>user_id:{sig['user_id']}</span>
                        <span>reveal_threshold:{sig['reveal_threshold']}</span>
                        <span>email:{userForSig(sig)['email']}</span>
                    </li>
                )}
                { signatures && signatures.length < 1 && <li>Nobody has signed this petition.</li>}
                </ul>
                <TestSignatureUsers petition={petition} onSignatureSubmit={onSignatureSubmit} users={users} loading={uLoading} error={uError} errorMessage={uErrorMessage} />
            </>}
        </section>
    );
}

const PetitionView = ({ basePath }) => {
    const location = useLocation();
    const petitionId = location.pathname.replace(basePath, '');
    const { data:petition, loading, error, errorMessage } = useFetchDataAuth({ url:`/api/petitions/${petitionId}`});

    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>
            {petition && <>
                <h2>Petition: {petition['subject']}</h2>
                <p>Petition Text: {petition['petition_text']}</p>
                <TestSignaturesList petition={petition}/>          
            </>}
        </section>
    );
}

export default PetitionView;
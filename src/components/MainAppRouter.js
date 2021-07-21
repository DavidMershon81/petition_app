import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DebugUsersView from './DebugUsersView';
import PetitionGroupView from './PetitionGroupView';
import AddPetitionGroupView from './AddPetitionGroupView';
import AddPetitionView from './AddPetitionView';
import PetitionView from './PetitionView';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import HomeView from './HomeView';
import TopNavSection from './TopNavSection';
import { AppContext } from '../contexts/AppContext';
import { useState, useEffect } from 'react';
import useGetData from  '../hooks/useGetData';
import usePostData from  '../hooks/usePostData';
import { LoadingBox } from './MiscControls'; 

const MainAppRouter = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const onLogoutConfirm = () => {
    setLoggedInUser(null);
  }
  const { data:login_info, loading, error, errorMessage } = useGetData({ url:'/api/get_current_user' });
  const { post:logout } = usePostData({ 
    url:'/api/logout',
    onConfirm:onLogoutConfirm
  });
  
  useEffect(() => {
    if(login_info) {
      setLoggedInUser(login_info.user_email);
    }
  },[login_info]);

  return (
      <>
          <AppContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
            { !error && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            {!loading && 
            <Router>
              <TopNavSection />
              <Switch>
                <Route exact path='/' component={HomeView} />
                <Route exact path='/login' component={LoginView} />
                <Route exact path='/register' component={RegisterView} />
                <Route path='/petition_group/' component={ () => <PetitionGroupView basePath='/petition_group/' />} />
                <Route exact path='/add_petition_group/'  component={AddPetitionGroupView} />
                <Route path='/add_petition/' component={ () => <AddPetitionView basePath='/add_petition/' />} />
                <Route path='/petitions/' component={ () => <PetitionView basePath='/petitions/' />} />
                <Route exact path='/debug/users' component={DebugUsersView} />
              </Switch>
            </Router>}
          </AppContext.Provider>
      </>
  );
}

export default MainAppRouter;

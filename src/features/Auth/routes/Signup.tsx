import AuthLayout from '../components/Layout';
import {SignupForm} from '../components/SignupForm'



export const Signup: React.FC = () => {
  
  return (
    <AuthLayout header='Login'>
      <SignupForm />
    </AuthLayout>
);
};

export default Signup;

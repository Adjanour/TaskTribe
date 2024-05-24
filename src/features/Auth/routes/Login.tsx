import AuthLayout from '../components/Layout';
import  {LoginForm}  from '../components/LoginForm'



export const Login: React.FC = () => {
  
  return (
    <AuthLayout header='Login'>
      <LoginForm />
    </AuthLayout>
);
};

export default Login;

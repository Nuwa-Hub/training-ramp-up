import { useEffect, useState } from 'react'
import './signInPage.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { deleteError, deleteMsg, userLoginStart, userRegisterStart } from './userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const SignInPage = (): JSX.Element => {
  const [isRightPanelActive, setIsRightPanelActive] = useState('')
  const auth = useSelector((state: any) => state.userData?.user)
  const navigate = useNavigate()
  const location = useLocation()
  const notify = (msg: string): any => toast(msg)
  const err = useSelector((state: any) => state?.userData?.error)
  const msg = useSelector((state: any) => state?.userData?.message)
  const from = location.state.from?.pathname || '/'

  const distpatch = useDispatch()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (auth?.user) {
      navigate(from, { replace: true })
    }
  }, [auth, navigate, from])

  useEffect(() => {
    if (err) {
      notify(err)
      setTimeout(() => {
        distpatch(deleteError())
      }, 2000)
    }
    if (msg) {
      notify(msg)
    }
    setTimeout(() => {
      distpatch(deleteMsg())
    }, 2000)
  }, [err, msg])

  const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  })
  const SignInSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  })
  const navigateSignIn = (): void => {
    setIsRightPanelActive('')
  }
  const navigateSignUp = (): void => {
    setIsRightPanelActive('right-panel-active')
  }

  useEffect(() => {
    document.addEventListener('navigateSignIn', navigateSignIn)
    document.addEventListener('navigateSignUp', navigateSignUp)
    return () => {
      document.removeEventListener('navigateSignIn', navigateSignIn)
      document.removeEventListener('navigateSignUp', navigateSignUp)
    }
  }, [])

  const handleGoogleLogin = () => {
    window.open('http://localhost:5000/api/users/google', '_self')
  }
  const getUser = () => {
    void fetch('http://localhost:5000/api/users/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      } as any,
    })
  }

  return (
    <>
      <ToastContainer />
      <h2>Ramp Up</h2>
      <div className={`container ${isRightPanelActive}`} id='container'>
        <div className='form-container sign-up-container'>
          <div className='form-div'>
            <h1>Create Account</h1>
            <div className='social-container'>
              <a onClick={handleGoogleLogin} className='social'>
                <img
                  className='socialIcon'
                  src='https://firebasestorage.googleapis.com/v0/b/dailydiary-96e2f.appspot.com/o/119930_google_512x512.png?alt=media&token=1428c2df-d8d8-4c55-91d8-8b133465d2a0'
                  alt='Google Icon'
                ></img>
              </a>
              <a onClick={getUser} className='social'>
                <img
                  className='socialIcon'
                  src='https://firebasestorage.googleapis.com/v0/b/dailydiary-96e2f.appspot.com/o/984f500cf9de4519b02b354346eb72e0-facebook-icon-social-media-by-vexels.png?alt=media&token=688568a9-f923-4f0e-af28-da64dbee5046'
                  alt='Google Icon'
                ></img>
              </a>
              <a href='#' className='social'>
                <img
                  className='socialIcon'
                  src='https://firebasestorage.googleapis.com/v0/b/dailydiary-96e2f.appspot.com/o/icon.svg?alt=media&token=ea44f541-57eb-47bb-85b1-c4609c13d25b'
                  alt='Google Icon'
                ></img>
              </a>
            </div>
            <span>or use your email for registration</span>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={SignUpSchema}
              onSubmit={(values, { resetForm }) => {
                const { email, password } = values
                distpatch(userRegisterStart({ Email: email, Password: password, Role: 'guest' }))
                resetForm()
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <Field className='input-field' name='email' placeholder='Email' />
                    {(errors.email ?? '').length > 0 && (touched.email ?? false) ? (
                      <div className='login-err'>{errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      className='input-field'
                      type='password'
                      name='password'
                      placeholder='Password'
                    />
                    {(errors.password ?? '').length > 0 && (touched.password ?? false) ? (
                      <div className='login-err'>{errors.password}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      className='input-field'
                      type='password'
                      name='confirmPassword'
                      placeholder='Password'
                    />
                    {(errors.confirmPassword ?? '').length > 0 &&
                    (touched.confirmPassword ?? false) ? (
                      <div className='login-err'>{errors.confirmPassword}</div>
                    ) : null}
                  </div>
                  <button type='submit'>Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className='form-container sign-in-container'>
          <div className='form-div'>
            <h1>Sign in</h1>
            <div className='social-container'>
              <a href='#' className='social'>
                <img
                  className='socialIcon'
                  src='https://firebasestorage.googleapis.com/v0/b/dailydiary-96e2f.appspot.com/o/119930_google_512x512.png?alt=media&token=1428c2df-d8d8-4c55-91d8-8b133465d2a0'
                  alt='Google Icon'
                ></img>
              </a>
              <a href='#' className='social'>
                <img
                  className='socialIcon'
                  src='https://firebasestorage.googleapis.com/v0/b/dailydiary-96e2f.appspot.com/o/984f500cf9de4519b02b354346eb72e0-facebook-icon-social-media-by-vexels.png?alt=media&token=688568a9-f923-4f0e-af28-da64dbee5046'
                  alt='Google Icon'
                ></img>
              </a>
              <a href='#' className='social'>
                <img
                  className='socialIcon'
                  src='https://firebasestorage.googleapis.com/v0/b/dailydiary-96e2f.appspot.com/o/icon.svg?alt=media&token=ea44f541-57eb-47bb-85b1-c4609c13d25b'
                  alt='Google Icon'
                ></img>
              </a>
            </div>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignInSchema}
              onSubmit={(values, { resetForm }) => {
                const { email, password } = values
                distpatch(userLoginStart({ Email: email, Password: password }))
                resetForm()
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <Field className='input-field' name='email' placeholder='Email' />
                    {(errors.email ?? '').length > 0 && (touched.email ?? false) ? (
                      <div className='login-err'>{errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      className='input-field'
                      type='password'
                      name='password'
                      placeholder='Password'
                    />
                    {(errors.password ?? '').length > 0 && (touched.password ?? false) ? (
                      <div className='login-err'>{errors.password}</div>
                    ) : null}
                  </div>

                  <button type='submit'>Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button
                className='ghost'
                id='signIn'
                onClick={() => {
                  document.dispatchEvent(new Event('navigateSignIn'))
                }}
              >
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className='ghost'
                id='signUp'
                onClick={() => {
                  document.dispatchEvent(new Event('navigateSignUp'))
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import { Nav, Navbar, Form, FormControl, Button, InputGroup } from '../bootstrap-osu-collector';
import config from '../../config/config'
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserBadge from './UserBadge';
import LoginButton from './LoginButton';
import UploadModal from './UploadModal';
import { CloudUpload, LightbulbFill, Moon } from 'react-bootstrap-icons';
import md5 from 'md5';
import '../common/Glow.css'
import './NavButton.css'
import ReactPlaceholder from 'react-placeholder/lib';
import { ThemeContext } from 'styled-components';
import { useMediaQuery } from 'react-responsive'

const Medium = ({ children }) => useMediaQuery({ maxWidth: 992 - 1 }) ? children : null
const Large = ({ children }) => useMediaQuery({ minWidth: 992 }) ? children : null

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

function NavigationBar({
    user,
    setAuthX,
    setSearchText,
    toggleTheme
}) {

    const theme = useContext(ThemeContext)

    const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
    const [searchBarInput, setSearchBarInput] = useState('');
    const history = useHistory()

    const searchSubmit = (event) => {
        event.preventDefault();
        history.push(`/all?search=${encodeURIComponent(searchBarInput)}`);
        setSearchText(searchBarInput)
        return false;
    }

    const otpLogin = () => {
        const clientId = config.get('CLIENT_ID')
        const callback = encodeURIComponent(config.get('OAUTH_CALLBACK'))
        const x = md5(Date.now())
        setAuthX(x)
        console.log(x)
        openInNewTab(`https://osu.ppy.sh/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callback}&state=${x}`)
        history.push('/login/enterOtp')
    }

    const loginButton = process.env.NODE_ENV === 'production' ?
        <LoginButton />
        : <Button className='ml-2' onClick={otpLogin}> Login </Button>

    return (
        <div>
            <Navbar bg='dark' variant='dark' expand='lg' className='pl-3'>
                <Large>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            osu!<strong>Collector</strong>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav' className='justify-content-between'>
                        <Nav className='me-auto'>
                            <LinkContainer to='/recent'>
                                <Nav.Link>Recent</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/popular?range=alltime'>
                                <Nav.Link>Popular</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/users'>
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/client'>
                                <Nav.Link>Desktop Client</Nav.Link>
                            </LinkContainer>
                        </Nav>

                        <Form onSubmit={searchSubmit} className='ml-3 me-auto'>
                            <InputGroup>
                                <FormControl
                                    onChange={(e) => setSearchBarInput(e.target.value)}
                                    type='search'
                                    placeholder='tech, aim, speed' />
                                <Button
                                    type='submit'
                                    variant='primary'
                                >
                                    Search
                                </Button>
                            </InputGroup>
                        </Form>

                        <Nav>
                            <Button
                                className='ml-2'
                                variant='outline-secondary'
                                onClick={toggleTheme}>
                                {theme.darkMode ? <LightbulbFill /> : <Moon />}
                            </Button>

                            <Button
                                className='ml-2'
                                onClick={() => {
                                    if (user)
                                        setUploadModalIsOpen(true)
                                    else
                                        alert('Please log in!')
                                }}>
                                <div className='d-flex align-items-center'>
                                    <CloudUpload className='mr-2' />
                                    Upload
                                </div>
                            </Button>

                            <ReactPlaceholder
                                ready={user !== undefined}
                                showLoadingAnimation
                                type='rect'
                                className='ml-3 mr-0'
                                style={{
                                    width: '120px',
                                    height: 'auto',
                                    borderRadius: '30px'
                                }}
                            >
                                {user ? <UserBadge className='ml-3' user={user} /> : loginButton}
                            </ReactPlaceholder>
                        </Nav>
                    </Navbar.Collapse>
                </Large>
                <Medium>
                                        <LinkContainer to='/'>
                        <Navbar.Brand>osu!<strong>Collector</strong></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav' className='justify-content-between'>
                        <Nav className='me-auto'>
                            <LinkContainer to='/recent'>
                                <Nav.Link>Recent</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/popular?range=alltime'>
                                <Nav.Link>Popular</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/users'>
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/client'>
                                <Nav.Link>Desktop Client</Nav.Link>
                            </LinkContainer>

                            <Nav.Link onClick={toggleTheme}>
                                {theme.darkMode ? <LightbulbFill className='mr-2' /> : <Moon className='mr-2' />}
                                {theme.darkMode ? 'Light Mode' : 'Dark Mode'}
                            </Nav.Link>

                            <Nav.Link onClick={() => {
                                if (user)
                                    setUploadModalIsOpen(true)
                                else
                                    alert('Please log in!')
                            }}>
                                <CloudUpload className='mr-2' />
                                Upload
                            </Nav.Link>

                            {!user &&
                                <Nav.Link onClick={otpLogin}>Login</Nav.Link>
                            }

                            <Form onSubmit={searchSubmit} className='me-auto my-2'>
                                <InputGroup>
                                    <FormControl
                                        onChange={(e) => setSearchBarInput(e.target.value)}
                                        type='search'
                                        size='sm'
                                        placeholder='tech, aim, speed' />
                                    <Button
                                        type='submit'
                                        size='sm'
                                        variant='primary'
                                    >
                                        Search
                                    </Button>
                                </InputGroup>
                            </Form>

                        </Nav>

                    </Navbar.Collapse>
                </Medium>
            </Navbar>
            <UploadModal
                uploadModalIsOpen={uploadModalIsOpen}
                setUploadModalIsOpen={setUploadModalIsOpen} />
        </div >
    )
}

export default NavigationBar;
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  Link
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants/url';
import { GlobalContext } from '../../contexts/GlobalContext';
import { goToHomePage, goToSignupPage } from '../../routes/coordinator';

const LoginPage = () => {

  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()
  const context = useContext(GlobalContext)
  
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password:""
  })

  //se a pessoa já estiver logada, não precisa logar de novo
  useEffect(() => {
    if(context.isAuth) {
      goToHomePage(navigate)
    }
  }, [])

  const onChangeForm = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  // const onChangeEmail = (event) => {
  //   setEmail(event.target.value)
  // }

  // const onChangePassword = (event) => {
  //   setPassword(event.target.value)
  // }

  const login = async () => {
    try {
      setIsLoading(true)

      const body = {
        email: form.email,
        password: form.password
      }

      const response = await axios.post(
        `${BASE_URL}/user/login`, body
      )

      window.localStorage.setItem("cookenu-token", response.data.token)
      
      setIsLoading(false)
      context.setIsAuth(true)

      goToHomePage(navigate)

    }
    catch(error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Entre em sua conta</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para aproveitar as melhores receitas ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input 
                name="email" 
                value={form.email} 
                onChange={onChangeForm} 
                type="email" 
                autoComplete='off'
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input 
                name="password" 
                value={form.password} 
                onChange={onChangeForm} 
                type="password" 
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={login}
                >
                  {isLoading ? <Spinner/> : "Entrar"}
              </Button>
            </Stack>
            <Stack paddingTop={5} paddingBottom={5}>
              <Text fontSize={'lg'} color={'gray.600'} textAlign={"center"}>
                Ainda não tem conta? {" "}
                  <Link  color={"blue"} onClick={()=> goToSignupPage(navigate)}>Cadastre-se!</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  );
}

export default LoginPage
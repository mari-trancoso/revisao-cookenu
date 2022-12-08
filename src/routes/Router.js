import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from "../pages/LoginPage/LoginPage"
import SignUpPage from "../pages/SignupPage/SignUpPage"
import DetailsPage from "../pages/DetaislPage/DetailsPage"
import CreateRecipePage from "../pages/CreateRecipePage/CreateRecipePage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/recipe/:recipeId" element={<DetailsPage/>}/>
            <Route path="/recipe/new" element={<CreateRecipePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router
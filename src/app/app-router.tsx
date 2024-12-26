import { FC, ReactElement } from 'react'
import { Routes, Route } from 'react-router'
import { SignupPage } from '@pages/signup-page'
import { HomePage } from '@pages/home-page'

export const AppRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="signup" element={<SignupPage />} />
    </Routes>
  )
}

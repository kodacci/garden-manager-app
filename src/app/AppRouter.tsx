import { FC, ReactNode } from 'react'
import { Routes, Route } from 'react-router'
import { SignupPage } from '@pages/SignupPage'
import { HomePage } from '@pages/HomePage'

export const AppRouter: FC = (): ReactNode => {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="signup" element={<SignupPage />} />
    </Routes>
  )
}

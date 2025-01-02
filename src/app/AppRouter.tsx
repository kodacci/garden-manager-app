import { FC, ReactNode } from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from '@components/pages/HomePage'
import { SignInPage } from '@components/pages/SignInPage'
import { SignUpPage } from '@components/pages/SignUpPage'
import { SignOutPage } from '@components/pages/SignOutPage'

export const AppRouter: FC = (): ReactNode => {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="gardens" element={<HomePage />} />
      <Route path="signout" element={<SignOutPage />} />
    </Routes>
  )
}

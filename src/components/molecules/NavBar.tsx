import { FC } from 'react'
import { useAuthUser } from '@hooks/useAuthUser'
import { NotSignedNavBar } from '@components/molecules/NotSignedNavBar'
import { SignedNavBar } from '@components/molecules/SignedNavBar'

export const NavBar: FC = () => {
  const user = useAuthUser()

  return user ? <SignedNavBar /> : <NotSignedNavBar />
}

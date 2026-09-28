import { usePageMeta } from '../hooks/usePageMeta'
import { MenuShowcase } from '../components/sections/MenuShowcase/MenuShowcase'
import { SignatureDrink } from '../components/sections/SignatureDrink/SignatureDrink'

export function MenuPage() {
  usePageMeta('/menu')

  return (
    <>
      <MenuShowcase standalone />
      <SignatureDrink />
    </>
  )
}

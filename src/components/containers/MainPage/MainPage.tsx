import MainTable from '@/components/MainTable/MainTable'
import UsersWarning from '@/components/UsersWarning/UsersWarning'

const MainPage = (): React.ReactElement => {
  return (
    <main className="mx-auto px-2 md:container md:py-4">
      <UsersWarning />
      <MainTable />
    </main>
  )
}

export default MainPage

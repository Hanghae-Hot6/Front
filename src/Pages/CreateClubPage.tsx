import ThinLine from '../common/ThinLine';
import CreateClubBody from '../components/CreateClub_FixClub/Body/CreateClubBody';
import {CreateClubFixClubPageLayout} from '../components/CreateClub_FixClub/Layout/CreateClubFixClubPageLayout';
import CreateClubTitle from '../components/CreateClub_FixClub/Title/CreateClubTitle';
import Layout from '../components/Layout/Layout';
import Theme from '../theme/Theme';

const CreateClubPage = () => {
  return (
    <>
      <Layout>
        <CreateClubFixClubPageLayout>
          <CreateClubTitle title="모임 개설하기" />
          <ThinLine color={Theme.MainColor} />
          <CreateClubBody />
        </CreateClubFixClubPageLayout>
      </Layout>
    </>
  );
};
export default CreateClubPage;

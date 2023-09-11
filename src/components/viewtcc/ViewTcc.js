import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartTcc } from '../tccForms/viewTccForms';

const ViewTcc = () => {

  return (
    <>
      <SectionTitle title="Create TCC" />

      <Widget>
        <>
          <StartTcc />
        </>
      </Widget>
    </>
  );
}
export default ViewTcc
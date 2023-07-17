import Widget from '../widget'
import SectionTitle from '../section-title';
import { StartAssessment } from '../assessment/viewAssessment';

const ViewDirectAssessment = () => {
  
  return (
    <>
      <SectionTitle title="Start Direct Assessment" />

      <Widget>
        <>
          <StartAssessment />
        </>
      </Widget>
    </>
  );
}
export default ViewDirectAssessment
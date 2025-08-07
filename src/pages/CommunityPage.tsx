import { useParams } from "react-router-dom";
import { CommunityDisplay } from "../components/CommunityDisplay";

export const CommunityPage = () => {
  const {id} = useParams<{ id: string }>();
  return (
    <>
      <div className="">
      
        <CommunityDisplay communityId={Number(id)} />
      </div>
    </>
  );
};

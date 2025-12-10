import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "..";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectService from "../services/ProjectService";

export const InvitationToProject = observer(() => {
    const {store} = useContext(Context);
    
    const navigate = useNavigate();
    const projectId = useLocation().pathname.split("/").at(-1);
   
    useEffect(() => {
        if (localStorage.getItem("session")) 
            store.checkAuth().then((res:boolean) => !res && navigate("/")).then(
                async () => {
                    await ProjectService.AddProjectMember(projectId || "", store.user.id);
                    navigate("/home");
                }
            );
        else navigate("/");
    }, []);


    return <></>
});
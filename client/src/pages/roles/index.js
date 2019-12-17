import { authorize } from '../../components/authorize';
const Roles = () => {
    return (
        <div>
            Roles
        </div>
    );
}

export default authorize(['ROLE_CREATE', 'ROLE_SELECT'], null)(Roles);
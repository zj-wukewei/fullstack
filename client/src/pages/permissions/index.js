
import { authorize } from '../../components/authorize';
import { PermissionPagePermission } from '../../configs/router';

const Permission = () => {
    return (
        <div>
            Permission
        </div>
    );
}

export default authorize(PermissionPagePermission)(Permission);
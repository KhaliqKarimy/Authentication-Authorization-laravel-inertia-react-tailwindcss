import { useMemo } from "react";
import { usePage } from "@inertiajs/react";

export default function usePermission() {
    const { auth } = usePage().props;

    const roles = useMemo(() => auth?.roles ?? [], [auth]);

    const permissions = useMemo(() => auth?.permissions ?? [], [auth]);

    /**
     * Check single role
     */
    const hasRole = (role) => {
        return roles.includes(role);
    };

    /**
     * Check multiple roles
     */
    const hasAnyRole = (roleList = []) => {
        return roleList.some((role) => roles.includes(role));
    };

    /**
     * Check all roles
     */
    const hasAllRoles = (roleList = []) => {
        return roleList.every((role) => roles.includes(role));
    };

    /**
     * Check single permission
     */
    const can = (permission) => {
        return permissions.includes(permission);
    };

    /**
     * Check any permission
     */
    const canAny = (permissionList = []) => {
        return permissionList.some((permission) =>
            permissions.includes(permission),
        );
    };

    /**
     * Check all permissions
     */
    const canAll = (permissionList = []) => {
        return permissionList.every((permission) =>
            permissions.includes(permission),
        );
    };

    /**
     * Super admin / developer
     */
    const isSuperAdmin = hasRole("developer") || hasRole("super-admin");

    return {
        roles,
        permissions,

        hasRole,
        hasAnyRole,
        hasAllRoles,

        can,
        canAny,
        canAll,

        isSuperAdmin,
    };
}

import useAuthStore from "../stores/user.store";
import { getInitialsFromName } from "../utils/text.util";
import { ThemeSwitcher } from "./theme-switcher.component";

export function Navbar() {
    const [user, logout] = useAuthStore(state => [state.user, state.logout])

    return (
        <div className="navbar bg-base-100 shadow z-50 fixed">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">AuthG</a>
            </div>

            <div className="flex-none">
                <ThemeSwitcher />
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                            <span>{getInitialsFromName(user?.name)}</span>
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box border w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={() => logout()}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
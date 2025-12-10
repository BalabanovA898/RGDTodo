import { IArrayDidChange, makeAutoObservable } from "mobx";
import User from "../Classes/User";
import AuthService from "../services/AuthService";
import axios from "axios";
import { IAuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import Notification from "../Classes/Notification";



export default class Store {
    user = {} as User;
    isAuth = false;
    isLoading = false;
    notifications = [] as Notification[];

    constructor () {
        makeAutoObservable(this);
    }

    setAuth(auth: boolean) {
        this.isAuth = auth;
    }

    setUser(user: User) {
        this.user = user;
    }

    async login(email: string, password: string) {
        this.isLoading = true;
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem("session", response.data.session);
            this.setAuth(true);
            this.setUser(response.data.userDTO);
        } catch (e: any) {
            this.notifications.push(new Notification("error", e.message));
        } finally {
            this.isLoading = false;
        }
    }

    async register(email: string, password: string) {
        this.isLoading = true;
        try {
            const response = await AuthService.register(email, password);
            localStorage.setItem("session", response.data.session);
            this.setAuth(true);
            this.setUser(response.data.userDTO);
        } catch (e: any) {
            this.notifications.push(new Notification("error", e.message));
        }
        finally {
            this.isLoading = false;
        }
    }

    async logout() {
        this.isLoading = true;
        try {
            await AuthService.logout();
            localStorage.removeItem("session");
            this.setAuth(false);
            this.setUser({} as User);
        }
        catch (e: any) {
            this.notifications.push(new Notification("error", e.message));
        }
        finally {
            this.isLoading = false;
        }
    }

    async checkAuth(): Promise<boolean> {
        this.isLoading = true;
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/auth/refresh`, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("session")
                }
            });
            this.setAuth(true);
            this.setUser(response.data.userDTO);
            return true;
        } catch (e: any) {
            this.notifications.push(new Notification("error", e.message));
            return false;
        } finally {
            this.isLoading = false;
        }
    }
}
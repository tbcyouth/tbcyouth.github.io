
import groupsData from "../../data/groups.json";

export function getAuthGroup() {
    const groupId = localStorage.getItem("groupId");
    if (!groupId) return null;
    console.log(groupsData.find(g => g.id === Number(groupId)))
    return groupsData.find(g => g.id === Number(groupId));
}

export function isAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}

export function logout() {
    localStorage.removeItem("groupId");
    localStorage.removeItem("isAdmin");
}
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

export const TASKS_KEY = "tasks";

function useLocalStorage() {
    const get = (key: string) => localStorage.getItem(key);
    const set = (key: string, value: string) => localStorage.setItem(key, value);
    return {
        get,
        set
    }
};


export {
    useLocalStorage
}
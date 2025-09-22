import { useState, useEffect } from 'react'
import type { T_menu } from '../Types/type';

function useGetMenuDatas() {
    const [menuDatas, setMenuDatas] = useState<T_menu[] | null>(null);
  
    const getMenusHandler = async () => {
      try {
        const menuDatas = await (
          await fetch(`http://localhost:4000/v1/menus`)
        ).json();
        setMenuDatas(menuDatas);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };
  
    useEffect(() => {
      getMenusHandler();
    }, []);

  return menuDatas
}

export default useGetMenuDatas
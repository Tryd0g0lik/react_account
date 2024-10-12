/**
 * Here us need to get a pathname from the page's url.
 * When a pathname has text of '/change' or '/signUp', or '/loginIn'
 * We to receive the true else false.
 * This function we use for to run \
 * components a 'ChangePasswordFC', 'GoLoginInFC', 'GetFormRegistrationsFC'
 * @returns true/false
 */
export function checkPathnameOfUrl(): boolean {
  const pathname = document.location.pathname;
  const bool = (pathname.includes('/change')) ? true : (
    pathname.includes('/signUp') ? true : (
      pathname.includes('/loginIn') ? true : false
    )
  );
  return bool;
}

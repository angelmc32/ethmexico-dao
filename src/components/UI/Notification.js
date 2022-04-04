import UIkit from "uikit";

export const successNotification = (message) => {
  UIkit.notification({
    message: `<p class="uk-text-center uk-margin-remove">${message}</p>`,
    pos: "bottom-center",
    status: "success",
  });
};

export const warningNotification = (message) => {
  UIkit.notification({
    message: `<p class="uk-text-center uk-margin-remove">${message}</p>`,
    pos: "bottom-center",
    status: "warning",
  });
};

export const dangerNotification = (message) => {
  UIkit.notification({
    message: `<p class="uk-text-center uk-margin-remove">${message}</p>`,
    pos: "bottom-center",
    status: "danger",
  });
};

import React from "react";
import { Avatar, ListItemAvatar } from "@material-ui/core";

import { generateAvatarColor } from "./../helpers/generateAvatarColor";

export default function UserAvatar({ user }) {
  if (user) {
    const { color, colorLighten } = generateAvatarColor(user.id);
    return (
      <>
        <ListItemAvatar>
          <Avatar
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
            }}
          >
            {user.user}
          </Avatar>
        </ListItemAvatar>
      </>
    );
  } else {
    const { color, colorLighten } = generateAvatarColor("42s34237fdsf774234");
    return (
      <>
        <ListItemAvatar>
          <Avatar
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
            }}
          >
            {user.user}
          </Avatar>
        </ListItemAvatar>
      </>
    );
  }

  //   return (
  //     <>
  //       <ListItemAvatar>
  //         <Avatar
  //           style={{
  //             background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
  //           }}
  //         >
  //           {user.user}
  //         </Avatar>
  //       </ListItemAvatar>
  //     </>
  //   );
}

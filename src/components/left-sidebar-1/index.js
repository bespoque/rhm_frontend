import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Title from './title';
import Item from './item';
import Logo from './logo';
import jwt from 'jsonwebtoken';

const LeftSidebar = () => {
  const [userInfo, setUserInfo] = useState([])
  const {
    authentication,
    navigationAdmin,
    navigationATOfficer
  } = useSelector(
    (state) => ({
      navigationAdmin: state.navigationAdmin,
      authentication: state.authentication.auth,
      navigationATOfficer: state.navigationATOfficer,
    }),
    shallowEqual
  );

  let adminRange = [1]

  let StaffType;
  if (authentication) {
    console.log("authentication", jwt.decode(authentication));
    StaffType = jwt.decode(authentication)?.groups;
  }

  const email = jwt.decode(authentication)?.user;
  
  useEffect(() => {

    const fetchPost = async () => {
      try {
        const response = await fetch('https://bespoque.dev/rhm/get-userpermissions.php', {
          method: "POST",
          body: JSON.stringify({ "useremail": email })
        })
        const data = await response.json()
        const apps = data.body?.apps
        setUserInfo(apps)
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchPost();
  }, []);

  console.log("appNames", appNames);

  const appNames = userInfo?.map(app => app.appName);

  if (appNames?.includes("Taxpyer") || appNames?.includes("Assessment") || appNames?.includes("Collection")) {
    return (
      <div className="left-sidebar left-sidebar-1">
        <Logo />
        {navigationATOfficer.map((menu, i) => (
          <React.Fragment key={i}>
            <Title>{menu.title}</Title>
            <ul>
              {menu.items.map((l0, a) => (
                <li key={a} className="l0">
                  <Item {...l0} />
                  <ul>
                    {l0.items.map((l1, b) => (
                      <li key={b} className="l1">
                        <Item {...l1} />
                        <ul className="">
                          {l1.items.map((l2, c) => (
                            <li key={c} className="">
                              <Item {...l2} />

                              {/* 
                              <ul>
                              {l2.items.map((l3, d) => (
                                <li key={d} className="l3">
                                  <Item {...l3} />
                                  <ul>
                                    {l3.items.map((l4, e) => (
                                      <li key={e} className="l4">
                                        <Item {...l4} />
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul> */}


                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    );
  }


  else if (StaffType.some(r => adminRange.includes(r))) {
    return (
      <div className="left-sidebar left-sidebar-1">
        <Logo />

        {navigationAdmin.map((menu, i) => (
          <React.Fragment key={i}>
            <Title>{menu.title}</Title>
            <ul>
              {menu.items.map((l0, a) => (
                <li key={a} className="l0">
                  <Item {...l0} />
                  <ul>
                    {l0.items.map((l1, b) => (
                      <li key={b} className="l1">
                        <Item {...l1} />
                        <ul className="">
                          {l1.items.map((l2, c) => (
                            <li key={c} className="">
                              <Item {...l2} />


                              {/* <ul>
                                {l2.items.map((l3, d) => (
                                  <li key={d} className="l3">
                                    <Item {...l3} />
                                    <ul>
                                      {l3.items.map((l4, e) => (
                                        <li key={e} className="l4">
                                          <Item {...l4} />
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                ))}
                              </ul> */}


                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="left-sidebar left-sidebar-1">
      <Logo />
      <p>Oops! No Permissions assigned to user</p>
      {/* 
      {navigationAdmin.map((menu, i) => (
        <React.Fragment key={i}>
          <Title>{menu.title}</Title>
          <ul>
            {menu.items.map((l0, a) => (
              <li key={a} className="l0">
                <Item {...l0} />
                <ul>
                  {l0.items.map((l1, b) => (
                    <li key={b} className="l1">
                      <Item {...l1} />
                      <ul className="">
                        {l1.items.map((l2, c) => (
                          <li key={c} className="">
                            <Item {...l2} />


                            <ul>
                              {l2.items.map((l3, d) => (
                                <li key={d} className="l3">
                                  <Item {...l3} />
                                  <ul>
                                    {l3.items.map((l4, e) => (
                                      <li key={e} className="l4">
                                        <Item {...l4} />
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>


                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))} */}
    </div>
  );
};

export default LeftSidebar;

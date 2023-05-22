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
    navigationApprover,
    navigationApproverTcc,
    navigationCreator,
    navigationCreatorTcc,
    navigationAdmin,
    navigationReport,
    navigationATOfficer
  } = useSelector(
    (state) => ({
      navigationAdmin: state.navigationAdmin,
      authentication: state.authentication.auth,
      navigationApprover: state.navigationApprover,
      navigationCreator: state.navigationCreator,
      navigationCreatorTcc: state.navigationCreatorTcc,
      navigationReport: state.navigationReport,
      navigationCreatorTcc: state.navigationCreatorTcc,
      navigationApproverTcc: state.navigationApproverTcc,
      navigationATOfficer: state.navigationATOfficer,
    }),
    shallowEqual
  );

  let approverRange = [1, 2, 3, 12, 21, 27, 20]
  let creatorRange = [1, 4, 13, 15]
  let adminRange = [1]
  let reportRange = [39, 1, 9]
  let payeTccInitiator = [29, 1]
  let payeTccApprover = [1, 30, 21, 30]

  let StaffType;
  if (authentication) {
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

  // if (StaffType.some(r => payeTccInitiator.includes(r)) && StaffType.some(r => payeTccInitiator.includes(r)) && StaffType.some(r => payeTccInitiator.includes(r))) {
  //   return (
  //     <div className="left-sidebar left-sidebar-1">
  //       <Logo />
  //       {navigationCreatorTcc.map((menu, i) => (
  //         <React.Fragment key={i}>
  //           <Title>{menu.title}</Title>
  //           <ul>
  //             {menu.items.map((l0, a) => (
  //               <li key={a} className="l0">
  //                 <Item {...l0} />
  //                 <ul>
  //                   {l0.items.map((l1, b) => (
  //                     <li key={b} className="l1">
  //                       <Item {...l1} />
  //                       <ul className="">
  //                         {l1.items.map((l2, c) => (
  //                           <li key={c} className="">
  //                             <Item {...l2} />


  //                             <ul>
  //                               {l2.items.map((l3, d) => (
  //                                 <li key={d} className="l3">
  //                                   <Item {...l3} />
  //                                   <ul>
  //                                     {l3.items.map((l4, e) => (
  //                                       <li key={e} className="l4">
  //                                         <Item {...l4} />
  //                                       </li>
  //                                     ))}
  //                                   </ul>
  //                                 </li>
  //                               ))}
  //                             </ul>


  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </li>
  //             ))}
  //           </ul>
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  // }

  // if (StaffType.some(r => payeTccApprover.includes(r)) && StaffType.some(r => payeTccApprover.includes(r)) && StaffType.some(r => payeTccApprover.includes(r))) {
  //   return (
  //     <div className="left-sidebar left-sidebar-1">
  //       <Logo />
  //       {navigationApproverTcc.map((menu, i) => (
  //         <React.Fragment key={i}>
  //           <Title>{menu.title}</Title>
  //           <ul>
  //             {menu.items.map((l0, a) => (
  //               <li key={a} className="l0">
  //                 <Item {...l0} />
  //                 <ul>
  //                   {l0.items.map((l1, b) => (
  //                     <li key={b} className="l1">
  //                       <Item {...l1} />
  //                       <ul className="">
  //                         {l1.items.map((l2, c) => (
  //                           <li key={c} className="">
  //                             <Item {...l2} />


  //                             <ul>
  //                             {l2.items.map((l3, d) => (
  //                               <li key={d} className="l3">
  //                                 <Item {...l3} />
  //                                 <ul>
  //                                   {l3.items.map((l4, e) => (
  //                                     <li key={e} className="l4">
  //                                       <Item {...l4} />
  //                                     </li>
  //                                   ))}
  //                                 </ul>
  //                               </li>
  //                             ))}
  //                           </ul>


  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </li>
  //             ))}
  //           </ul>
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  // }

  // if (StaffType.some(r => reportRange.includes(r))) {
  //   return (
  //     <div className="left-sidebar left-sidebar-1">
  //       <Logo />
  //       {navigationReport.map((menu, i) => (
  //         <React.Fragment key={i}>
  //           <Title>{menu.title}</Title>
  //           <ul>
  //             {menu.items.map((l0, a) => (
  //               <li key={a} className="l0">
  //                 <Item {...l0} />
  //                 <ul>
  //                   {l0.items.map((l1, b) => (
  //                     <li key={b} className="l1">
  //                       <Item {...l1} />
  //                       <ul className="">
  //                         {l1.items.map((l2, c) => (
  //                           <li key={c} className="">
  //                             <Item {...l2} />


  //                             <ul>
  //                             {l2.items.map((l3, d) => (
  //                               <li key={d} className="l3">
  //                                 <Item {...l3} />
  //                                 <ul>
  //                                   {l3.items.map((l4, e) => (
  //                                     <li key={e} className="l4">
  //                                       <Item {...l4} />
  //                                     </li>
  //                                   ))}
  //                                 </ul>
  //                               </li>
  //                             ))}
  //                           </ul>


  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </li>
  //             ))}
  //           </ul>
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  // }





  // console.log(StaffType.some(r => approverRange.includes(r)))

  // else if (StaffType.some(r => approverRange.includes(r))) {
  //   return (
  //     <div className="left-sidebar left-sidebar-1">
  //       <Logo />

  //       {navigationApprover.map((menu, i) => (
  //         <React.Fragment key={i}>
  //           <Title>{menu.title}</Title>
  //           <ul>
  //             {menu.items.map((l0, a) => (
  //               <li key={a} className="l0">
  //                 <Item {...l0} />
  //                 <ul>
  //                   {l0.items.map((l1, b) => (
  //                     <li key={b} className="l1">
  //                       <Item {...l1} />
  //                       <ul className="">
  //                         {l1.items.map((l2, c) => (
  //                           <li key={c} className="">
  //                             <Item {...l2} />


  //                             <ul>
  //                             {l2.items.map((l3, d) => (
  //                               <li key={d} className="l3">
  //                                 <Item {...l3} />
  //                                 <ul>
  //                                   {l3.items.map((l4, e) => (
  //                                     <li key={e} className="l4">
  //                                       <Item {...l4} />
  //                                     </li>
  //                                   ))}
  //                                 </ul>
  //                               </li>
  //                             ))}
  //                           </ul>


  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </li>
  //             ))}
  //           </ul>
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  // }

  // else if (StaffType.some(r => creatorRange.includes(r))) {
  //   return (
  //     <div className="left-sidebar left-sidebar-1">
  //       <Logo />

  //       {navigationCreator.map((menu, i) => (
  //         <React.Fragment key={i}>
  //           <Title>{menu.title}</Title>
  //           <ul>
  //             {menu.items.map((l0, a) => (
  //               <li key={a} className="l0">
  //                 <Item {...l0} />
  //                 <ul>
  //                   {l0.items.map((l1, b) => (
  //                     <li key={b} className="l1">
  //                       <Item {...l1} />
  //                       <ul className="">
  //                         {l1.items.map((l2, c) => (
  //                           <li key={c} className="">
  //                             <Item {...l2} />


  //                             <ul>
  //                             {l2.items.map((l3, d) => (
  //                               <li key={d} className="l3">
  //                                 <Item {...l3} />
  //                                 <ul>
  //                                   {l3.items.map((l4, e) => (
  //                                     <li key={e} className="l4">
  //                                       <Item {...l4} />
  //                                     </li>
  //                                   ))}
  //                                 </ul>
  //                               </li>
  //                             ))}
  //                           </ul>


  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </li>
  //             ))}
  //           </ul>
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  // }

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
};

export default LeftSidebar;

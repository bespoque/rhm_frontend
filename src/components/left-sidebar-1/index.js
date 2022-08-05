import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Title from './title';
import Item from './item';
import Logo from './logo';
import jwt from 'jsonwebtoken';

const LeftSidebar = () => {
  const { navigation, authentication, individualNavigation,
    navigationApprover, navigationCreator, navigationCreatorApprover, navigationAdmin, navigationReport } = useSelector(
      (state) => ({
        navigationAdmin: state.navigationAdmin,
        navigation: state.navigation,
        authentication: state.authentication.auth,
        individualNavigation: state.individualNavigation,
        navigationApprover: state.navigationApprover,
        navigationCreator: state.navigationCreator,
        navigationCreatorApprover: state.navigationCreatorApprover,
        navigationReport: state.navigationReport,
      }),
      shallowEqual
    );

  let approverRange = [1, 2, 3, 12, 21]
  let creatorRange = [1, 4, 13, 15]
  let adminRange = [1]
  let reportRange = [39, 9, 20]

  let StaffType;
  if (authentication) {
    StaffType = jwt.decode(authentication)?.groups;
  }

  if (StaffType.some(r => approverRange.includes(r)) && StaffType.some(r => creatorRange.includes(r)) && StaffType.some(r => adminRange.includes(r))) {
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
  if (StaffType.some(r => reportRange.includes(r)) ) {
    return (
      <div className="left-sidebar left-sidebar-1">
        <Logo />
        {navigationReport.map((menu, i) => (
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

  // creatorapprover nav seems redundant

  // else if (StaffType.some(r => approverRange.includes(r)) && StaffType.some(r => creatorRange.includes(r))) {
  //   return (
  //     <div className="left-sidebar left-sidebar-1">
  //       <Logo />
  //       {navigationCreatorApprover.map((menu, i) => (
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
  //                             {/* <ul>
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
  //                           </ul> */}
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

  else if (StaffType.some(r => approverRange.includes(r))) {
    return (
      <div className="left-sidebar left-sidebar-1">
        <Logo />

        {navigationApprover.map((menu, i) => (
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

  else if (StaffType.some(r => creatorRange.includes(r))) {
    return (
      <div className="left-sidebar left-sidebar-1">
        <Logo />

        {navigationCreator.map((menu, i) => (
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
  // if (StaffType.includes(2) && StaffType.includes(3) && StaffType.includes(12) && StaffType.includes(4) && StaffType.includes(13) && StaffType.includes(12)) {
  //   console.log("true");
  //   return (
  //     <div className="left-sidebar left-sidebar-1">
  //       <Logo />

  //       {navigationCreatorApprover.map((menu, i) => (
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
  //                             {/* <ul>
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
  //                           </ul> */}
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

      {navigationCreator.map((menu, i) => (
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

import React from 'react';
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component",()=>{
  test("status from pops should be in the state",()=>{
    const component = create(<ProfileStatus status="Some Status from IT-Kamasutra" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('Some Status from IT-Kamasutra');
  })
})

// more test by IT-Kamasutra for this page ` https://youtu.be/Kyc_Z_2b2Hc?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8


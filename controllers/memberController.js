import { Member } from "../models/member.model.js";
import Selected from "../models/selected.model.js";

export const addMember = async (req, res, next) => {
  try {
    const id = req.user.id;
    const {
      name,
      dob,
      address,
      phone,
      location,
      info,
      gift1,
      gift2,
      gift3,
      giftGiven,
      recived,
      company,
      employeeName,
      delivered,
      received,
      deliveryDate,
      isArchived,
    } = req.body;

    // Create new member instance
    let newMember = new Member({
      name,
      dob,
      address,
      phone,
      location,
      info,
      gift1,
      gift2,
      gift3,
      giftGiven,
      recived,
      company,
      employeeName,
      delivered,
      received,
      deliveryDate,
      isArchived,
      createdBy: id,
    });
    // Save the new member
    newMember = await newMember.save();

    // Log the saved member object to verify the data
    res.status(200).json({ message: "Data Added", data: newMember });
  } catch (error) {
    next(error); // Handle any errors
  }
};

export const getMember = async (req, res, next) => {
  //send members with slected field set
  try {
    const members = await Member.find();
    const sM = await Selected.findOne({}).limit(1);
    const selectedMemberIds = sM
      ? new Set(sM.selectedMembers.map((item) => item.memberId.toString()))
      : new Set([]);
    console.log(selectedMemberIds);
    const memberWithSelctionStatus = members.map((member) => ({
      ...member.toObject(),
      selected: selectedMemberIds.has(member._id.toString()),
    }));
    console.log(memberWithSelctionStatus);
    res
      .status(200)
      .json({ message: "all members", data: memberWithSelctionStatus });
  } catch (error) {
    next(error);
  }
};
export const deleteMember = async (req, res, next) => {};

export const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      dob,
      address,
      phone,
      location,
      info,
      gift1,
      gift2,
      gift3,
      company,
    } = req.body.member;
    let oldMember = await Member.findById(id);
    if (!oldMember) {
      res.status(404).json({ message: "No such member found!" });
    }
    oldMember.name = name;
    oldMember.dob = dob;
    oldMember.address = address;
    oldMember.phone = phone;
    oldMember.location = location;
    oldMember.info = info;
    oldMember.gift1 = gift1;
    oldMember.gift2 = gift2;
    oldMember.gift3 = gift3;
    oldMember.company = company;

    await oldMember.save();
    res.status(200).json({ message: "Member updated", member: oldMember });
  } catch (error) {
    next(error);
  }
};

export const selectMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentYear = new Date().getFullYear();
    const currentYearList = await Selected.findOne({ year: currentYear });
    if (!currentYearList) {
      const newSelected = new Selected({
        year: currentYear,
        selectedMembers: [{ memberId: id }],
      });
      await newSelected.save();
    } else {
      currentYearList.selectedMembers.push({ memberId: id });
      await currentYearList.save();
    }
    let member = await Member.findById(id);
    member = {
      ...member.toObject(),
      selected: true,
    };
    res.status(200).json({ message: "Member selected", member });
  } catch (error) {
    next(error);
  }
};

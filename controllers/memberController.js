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
  try {
    const members = await Member.find();
    const selectedMembers = await Selected.findOne({}).limit(1);
    const selectedMemberIds = new Set(
      selectedMembers.selededMember.map((item) => item.memberId)
    );
    const memberWithSelctionStatus = members.map((member) => ({
      ...member.toObject(),
      selected: selectedMemberIds.has(member._id),
    }));

    res
      .status(200)
      .json({ message: "all members", data: memberWithSelctionStatus });
  } catch (error) {
    next(error);
  }
};
export const deleteMember = async (req, res, next) => {};

export const update = async (req, res, next) => {
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
      giftGiven,
      recived,
      company,
    } = req.body;
  } catch (error) {
    next(error);
  }
};

export const selectMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentYear = new Date().getFullYear();
    const currentYearList = await Selected.findOne({ year: currentYear });
    console.log(currentYearList.selectedMember);
    if (!currentYearList) {
      const newSelected = new Selected({
        year: currentYear,
        selectedMember: [id],
      });
      await newSelected.save();
    } else {
      // Step 1: Extract existing memberId into a Set
      const memberIdSet = new Set(
        currentYearList.selectedMember.map((member) =>
          member.memberId.toString()
        )
      );

      // Step 2: Check if the id is already in the Set
      if (!memberIdSet.has(id.toString())) {
        // Step 3: Add the new member to the array
        currentYearList.selectedMember.push({ memberId: id });

        // Save the updated document
        await currentYearList.save();
      }
    }
    res.status(200).json({ message: "Member selected", memb });
  } catch (error) {
    next(error);
  }
};

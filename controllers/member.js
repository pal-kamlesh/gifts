import Member from "../models/member.model.js";

export const addMember = async (req, res, next) => {
  try {
    const {
      name,
      dob,
      address,
      phone,
      area,
      site,
      gift1,
      gift2,
      gift3,
      giftGiven,
      recived,
      company,
    } = req.body;

    // Create gifts object
    const gifts = {
      gift1,
      gift2,
      gift3,
    };

    // Log the gifts object to ensure it's correctly populated
    console.log("Gifts Object:", gifts);

    // Create new member instance
    let newMember = new Member({
      name,
      dob,
      address,
      phone,
      area,
      site,
      gifts,
      giftGiven,
      recived,
      company,
    });

    // Save the new member
    newMember = await newMember.save();

    // Log the saved member object to verify the data
    console.log("New Member:", newMember);

    // Send response
    res.status(200).json({ message: "Data Added", data: newMember });
  } catch (error) {
    next(error); // Handle any errors
  }
};

export const getMember = async (req, res, next) => {
  try {
    const members = await Member.find();
    res.status(200).json({ message: "all members", data: members });
  } catch (error) {
    next(error);
  }
};
export const deleteMember = async (req, res, next) => {};

export const update = async (req, res, next) => {
  console.log(req.body);
};

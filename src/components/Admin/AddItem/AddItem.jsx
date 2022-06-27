import {
  Card,
  CardContent,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Input,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import React, { useRef, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { category } from "../../../data/data";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "../../../firebase.config";
import ProgressBar from "../../Common/ProgressBar";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import DescriptionIcon from "@mui/icons-material/Description";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";

const AddItem = (props) => {
  const [values, setValues] = useState(
    props?.values || {
      title: "",
      category: "",
      price: "",
      calories: "",
      description: "",
    }
  );
  const inputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  console.log("rerender");
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelected = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setImageFile(image);
      setImgSrc(URL.createObjectURL(image));
    }
  };

  const handleSave = (e) => {
    setIsUploading(true);
    e.preventDefault();
    console.log("values", values, inputRef.current);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(uploadProgress);
      },
      (error) => {
        console.log("error on upload", error);
        toast.error("error While Uploading the Image");
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
          toast.success("Image added successfully");
          const data = { ...values, imageURL, qty: 1, id: `${Date.now()}` };
          // console.log(data)
          setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
            merge: true,
          }).then(() => {
            toast.success("Data added successfully");
            setIsUploading(false);
          });
        });
      }
    );
  };

  const handleDeleteImg = (e) => {
    e.preventDefault();
    setImgSrc("");
    setImageFile(null);
    inputRef.current.value = "";
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 500,
          width: "100%",
          pointerEvents: isUploading ? "none" : "unset",
        }}
      >
        <CardContent>
          <FormControl variant="standard" fullWidth sx={margin}>
            <InputLabel htmlFor="input-with-icon-adornment">
              Give me a title...
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              value={values.title}
              startAdornment={
                <InputAdornment position="start">
                  <FastfoodIcon />
                </InputAdornment>
              }
              onChange={handleChange}
              name="title"
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={margin}>
            <InputLabel htmlFor="demo-simple-select-standard">
              Category
            </InputLabel>
            <Select
              id="demo-simple-select-standard"
              value={values.category}
              onChange={handleChange}
              label="Select category"
              name="category"
              startAdornment={
                <InputAdornment position="start">
                  <RestaurantIcon />
                </InputAdornment>
              }
            >
              {category.map((e) => (
                <MenuItem key={e.id} value={e.urlParamname}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            onClick={() =>
              !imgSrc && inputRef.current && inputRef.current.click()
            }
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {imgSrc ? (
                <>
                  <CloseIcon
                    sx={{
                      cursor: "pointer",
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    onClick={handleDeleteImg}
                  />
                  <img src={imgSrc} alt="dfvs" height="100%" />
                </>
              ) : (
                <>
                  <CloudUploadOutlinedIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6" component="div">
                    Select Image
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
          <Stack direction="row" spacing={2} sx={margin}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-price">
                Calories
              </InputLabel>
              <Input
                id="standard-adornment-price"
                value={values.calories}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <MedicationLiquidIcon />
                  </InputAdornment>
                }
                name="calories"
                type="number"
                inputProps={{
                  min: "1",
                }}
              />
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-price">Price</InputLabel>
              <Input
                id="standard-adornment-price"
                value={values.price}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                name="price"
                type="number"
                inputProps={{
                  min: "1",
                }}
              />
            </FormControl>
          </Stack>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-description">
              Description (optional)
            </InputLabel>
            <Input
              id="standard-adornment-description"
              value={values.description}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              }
              name="description"
              multiline
              rows={2}
            />
          </FormControl>
          <LoadingButton
            loading={isUploading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            fullWidth
            sx={margin}
            onClick={handleSave}
            disabled={
              !imgSrc ||
              Object.entries(values).some((x) =>
                x[0] === "description" ? false : x[1] === null || x[1] === ""
              )
            }
          >
            Save
          </LoadingButton>
          {isUploading && <ProgressBar value={imageProgress} />}
        </CardContent>
        <input
          ref={inputRef}
          style={{ height: 0, width: 0, display: "none" }}
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={handleImageSelected}
        />
      </Card>
    </Box>
  );
};
const margin = { my: 1.6 };
export default AddItem;
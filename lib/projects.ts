// Real OutMazed project photography — served from the live CMS
const U = "https://dashboard.outmazeddesign.ae/uploads/";

export type Project = {
  slug: string;
  name: string;
  scope: string;
  banner: string; // wide 1366px detail shot
  thumb: string; // 1280x720 card shot
};

export const PROJECTS: Project[] = [
  { slug: "miracle", name: "Miracle", scope: "Villa · Design & Build", banner: U + "25042024142601_Project_Detail_Miracle_jpg_51badff960.jpg", thumb: U + "16052024145333_Project_Miracle_png_05f9174b2c.png" },
  { slug: "solace", name: "Solace", scope: "Villa · Turnkey Renovation", banner: U + "15082024153258_Project_Solace_zinnia_Thumbnail_png_9caf418fbd.png", thumb: U + "15082024153520_Ziniamainweb_Banner_png_ce60e2b4fa.png" },
  { slug: "mudon", name: "Mudon", scope: "Villa · Interior + Exterior", banner: U + "Mudon_Project_Banner_web_view_b908914caa.jpg", thumb: U + "14082024210619_Mudon_png_4884617dee.png" },
  { slug: "murano", name: "Murano", scope: "Residence · Fit-Out", banner: U + "29052024161810_Murano_Projetc_Page_Web_Banner_jpg_295a170973.jpg", thumb: U + "29052024162516_Project_Murano_Thumbnail_jpg_6f8552c59e.jpg" },
  { slug: "aldea", name: "Aldea", scope: "Villa · Design & Build", banner: U + "24052024141235_Aldea_Project_Page_Web_Banner_jpg_3471fd39f3.jpg", thumb: U + "24052024144402_Project_Aldea_Thumbnail_png_86625383ab.png" },
  { slug: "majestic", name: "Majestic", scope: "Villa · Full Renovation", banner: U + "Banner_Image_666b4734e6.jpg", thumb: U + "video_coverimage_aaf315ccbf.jpg" },
  { slug: "lifetime", name: "Lifetime", scope: "Residence · Design & Build", banner: U + "Banner_Image_dcdf328051.jpg", thumb: U + "video_cover_image_0702c00f4b.jpg" },
  { slug: "jewel", name: "Jewel", scope: "Apartment · Interior", banner: U + "25042024144945_Project_Detail_Jewel_jpg_a2b16c4491.jpg", thumb: U + "16052024145051_Projecy_Jewel_jpg_399f132711.jpg" },
  { slug: "wonder", name: "Wonder", scope: "Villa · Interior", banner: U + "25042024143444_Project_Detail_Wonder_jpg_250907203d.jpg", thumb: U + "16052024144826project_Wonder_jpg_8dff8200ad.jpg" },
  { slug: "alpha", name: "Alpha", scope: "Villa · Design & Build", banner: U + "25042024113842_Project_Detail_Alpha_9ba7328848a4b4c41679_jpg_b64dcc0efc.jpg", thumb: U + "15052024164734_Project_Alpha_jpg_ecdb086ccd.jpg" },
  { slug: "bold", name: "Bold", scope: "Residence · Fit-Out", banner: U + "25042024140943_Project_Detail_Bold_jpg_45bb87ea3d.jpg", thumb: U + "16052024122218_Project_Bold_jpg_dc12555288.jpg" },
  { slug: "design", name: "Design", scope: "Villa · Interior", banner: U + "25042024151205_Project_Details_Design_jpg_4b5d1e3ac4.jpg", thumb: U + "16052024124110_Projectdesiogn_jpg_2d3acf414a.jpg" },
  { slug: "door-step", name: "Doorstep", scope: "Villa · Renovation", banner: U + "25042024104535_Project_Detail_Door_Step_c7ec18daf8e3e86c3b4f_jpg_77022ede56.jpg", thumb: U + "15052024141554_PROJECTDOORSTEPTHUMBNAIL_png_f545121531.png" },
  { slug: "greens", name: "Greens", scope: "Apartment · Interior", banner: U + "banner_36627d2da4.jpg", thumb: U + "youtube_1259e6298e.jpg" },
  { slug: "cliff", name: "Cliff", scope: "Villa · Design & Build", banner: U + "banner_95629da88e.jpg", thumb: U + "youtube_bf6bee6982.jpg" },
  { slug: "celine", name: "Celine", scope: "Villa · Interior", banner: U + "banner_2d9d2d5f29.jpg", thumb: U + "youtube_767c5df138.jpg" },
  { slug: "beyond", name: "Beyond", scope: "Villa · Renovation", banner: U + "banner_b97dc361ea.jpg", thumb: U + "youtube_77effee10b.jpg" },
  { slug: "violet", name: "Violet", scope: "Villa · Interior + Exterior", banner: U + "banner_c6b97b011c.jpg", thumb: U + "youtube_8b0c3f17b9.jpg" },
  { slug: "barn", name: "Barn", scope: "Residence · Design & Build", banner: U + "banner_5084fb8af2.jpg", thumb: U + "youtube_5b8fddb4c6.jpg" },
  { slug: "casa-colonia", name: "Casa Colonia", scope: "Villa · Design & Build", banner: U + "banner_32c2c194a8.jpg", thumb: U + "youtube_98e7a06398.jpg" },
];

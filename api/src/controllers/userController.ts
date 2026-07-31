import type { Request, Response } from "express";

// Get /api/user
export const getUserData = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role;
    const recentSearchedCities = req.user?.recentSearchedCities;
    res.status(200).json({
      success: true,
      role,
      recentSearchedCities,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    return res.status(500).json({
      success: false,
      message,
    });
  }
};

// Store recent Searched Cities
export const storeRecentSearcedCities = async (req: Request, res: Response) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (user?.recentSearchedCities?.length < 3) {
      user?.recentSearchedCities.push(recentSearchedCity);
    } else {
      user?.recentSearchedCities.shift();
      user?.recentSearchedCities.push(recentSearchedCity);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    return res.status(500).json({
      success: false,
      message,
    });
  }
};

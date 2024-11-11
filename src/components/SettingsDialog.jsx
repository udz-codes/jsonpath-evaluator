"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuSettings } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";

const SettingsDialog = () => {
  const [localStorageSettings, setLocalStorageSettings] = React.useState({
    enableLocalStorage: false,
    saveLastUsedQuery: false,
    keepSpreadsheetData: false,
  });

  const toggleSetting = (settingName, value) => {
    setLocalStorageSettings((prevSettings) => ({
      ...prevSettings,
      [settingName]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon">
          <LuSettings className="text-2xl m-0 p-0" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Enable/Disable Local Storage */}
          <div className="flex items-center justify-between">
            <p>Enable Local Storage</p>
            <Switch
              id="localStorageSwitch"
              checked={localStorageSettings.enableLocalStorage}
              onCheckedChange={(checked) =>
                toggleSetting("enableLocalStorage", checked)
              }
            />
          </div>

          {/* Additional options appear only if local storage is enabled */}
          {localStorageSettings.enableLocalStorage && (
            <div className="flex flex-row text-sm">
              <div className="mr-5 ml-3">
                <Separator orientation="vertical" />
              </div>
              <div className="flex flex-col w-full space-y-4">
                {/* Save Last Used Query */}
                <div className="flex items-center justify-between text-gray-600">
                  <p>Save Last Used Query</p>
                  <Switch
                    id="lastUsedQuerySwitch"
                    checked={localStorageSettings.saveLastUsedQuery}
                    onCheckedChange={(checked) =>
                      toggleSetting("saveLastUsedQuery", checked)
                    }
                  />
                </div>

                {/* Keep Spreadsheet Data */}
                <div className="flex items-center justify-between text-gray-600">
                  <p>Keep Spreadsheet Data</p>
                  <Switch
                    id="keepSpreadsheetDataSwitch"
                    checked={localStorageSettings.keepSpreadsheetData}
                    onCheckedChange={(checked) =>
                      toggleSetting("keepSpreadsheetData", checked)
                    }
                  />
                </div>

                {/* Clear local storage */}
                <div className="flex items-center justify-between">
                  <p className="text-red-600">Clear Stored Data</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to clear all stored data?"
                        )
                      ) {
                        // Clear local storage logic
                        setLocalStorageSettings({
                          enableLocalStorage: false,
                          saveLastUsedQuery: false,
                          keepSpreadsheetData: false,
                        });
                      }
                    }}
                    className="rounded-full px-3 py-0 flex items-center gap-2 bg-red-600 text-white h-6"
                  >
                    <RiDeleteBinLine className="text-md m-0" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs m-0 p-0 text-gray-400 ">
          We do not store anything on our databases (because we do not have one)
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;

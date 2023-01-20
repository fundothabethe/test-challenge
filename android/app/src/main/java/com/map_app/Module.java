package com.map_app;

//
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.content.IntentSender.SendIntentException;
import android.location.Location;
import android.location.Location;
import android.net.Uri;
import android.os.Bundle;
import android.os.Looper;
import android.provider.Settings;
import android.widget.Toast;
//

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
//

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
//

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResult;
import com.google.android.gms.location.LocationSettingsStatusCodes;
//

import java.util.HashMap;
import javax.annotation.Nonnull;

public class Module extends ReactContextBaseJavaModule {

  public static final String REACT_CLASS = "Module";
  private static ReactApplicationContext reactContext;
  private FusedLocationProviderClient fusedLocationClient;

  private Double latitude;
  private Double longitude;
  private LocationCallback location_callback;
  private LocationRequest locationRequest;
  public HashMap<String, Double> location = new HashMap<>();
  private GoogleApiClient googleApiClient;

  public Module(ReactApplicationContext context) {
    super(context);
    reactContext = context;
    fusedLocationClient =
      LocationServices.getFusedLocationProviderClient(context);

    locationRequest = locationRequest.create();
    locationRequest.setInterval(1000);
    locationRequest.setFastestInterval(500);
    locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

    location_callback =
      new LocationCallback() {
        @Override
        public void onLocationResult(LocationResult location_result) {
          if (location_result != null) {
            for (Location location : location_result.getLocations()) {
              latitude = location.getLatitude();
              longitude = location.getLongitude();
            }
          } else {
            return;
          }
        }
      };
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @ReactMethod
  public void stop_tracking() {
    fusedLocationClient.removeLocationUpdates(location_callback);
  }

  @ReactMethod
  public void get_location(Callback callback) {
    fusedLocationClient.requestLocationUpdates(
      locationRequest,
      location_callback,
      Looper.getMainLooper()
    );

    location.put("latitude", latitude);
    location.put("longitude", longitude);
    callback.invoke(latitude + " " + longitude);
  }

  @ReactMethod
  public void ask_permission() {
    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    Uri uri = Uri.fromParts(
      "package",
      getReactApplicationContext().getPackageName(),
      null
    );
    intent.setData(uri);
    reactContext.startActivity(intent);
  }

  @ReactMethod
  public void turn_on_location(Callback callback) {
    // if (googleApiClient == null) {
    googleApiClient =
      new GoogleApiClient.Builder(getCurrentActivity())
        .addApi(LocationServices.API)
        .addConnectionCallbacks(
          new GoogleApiClient.ConnectionCallbacks() {
            @Override
            public void onConnected(Bundle bundle) {}

            @Override
            public void onConnectionSuspended(int i) {
              googleApiClient.connect();
            }
          }
        )
        .addOnConnectionFailedListener(
          new GoogleApiClient.OnConnectionFailedListener() {
            @Override
            public void onConnectionFailed(ConnectionResult connectionResult) {
              // message(connectionResult.getErrorCode().toString());
            }
          }
        )
        .build();
    googleApiClient.connect();

    //
    LocationRequest locationRequest = LocationRequest.create();
    locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    locationRequest.setInterval(1000);
    locationRequest.setFastestInterval(5 * 1000);
    LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder()
      .addLocationRequest(locationRequest);

    builder.setAlwaysShow(true);

    PendingResult<LocationSettingsResult> result = LocationServices.SettingsApi.checkLocationSettings(
      googleApiClient,
      builder.build()
    );

    result.setResultCallback(
      new ResultCallback<LocationSettingsResult>() {
        @Override
        public void onResult(LocationSettingsResult result) {
          final Status status = result.getStatus();

          switch (status.getStatusCode()) {
            case LocationSettingsStatusCodes.SUCCESS:
              // All location settings are satisfied. The client can initialize location
              // requests here.
              callback.invoke("true");
              break;
            case LocationSettingsStatusCodes.RESOLUTION_REQUIRED:
              // Location settings are not satisfied. But could be fixed by showing the user
              // a dialog.

              try {
                // Show the dialog by calling startResolutionForResult(),
                // and check the result in onActivityResult().
                status.startResolutionForResult(getCurrentActivity(), 1000);
                callback.invoke("true");
                // getCurrentActivity()
                //   .startIntentSenderForResult(
                //     status.getResolution().getIntentSender(),
                //     1000,
                //     null,
                //     0,
                //     0,
                //     0,
                //     null
                //   );
              } catch (IntentSender.SendIntentException e) {
                // Ignore the error.
                callback.invoke("Error again");
              }
              break;
            case LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE:
              // Location settings are not satisfied. However, we have no way to fix the
              // settings so we won't show the dialog.
              callback.invoke("Error again");
              break;
            default:
              callback.invoke("No hit");
          }
        }
      }
    );
  }
}

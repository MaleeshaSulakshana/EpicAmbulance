package com.example.epicambulance;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;

import com.example.epicambulance.Ambulance.AmbulanceDashboardActivity;
import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.User.DashboardActivity;

public class MainActivity extends AppCompatActivity {

    private SharedPreferences sharedPreferences;
    private SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        For shared preferences
        sharedPreferences = getSharedPreferences("Login", Context.MODE_PRIVATE);
        editor = sharedPreferences.edit();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {

                checkExistingSignIn();

            }
        },4000);

    }

    private void checkExistingSignIn() {

        String id = sharedPreferences.getString("id", "");
        String userName = sharedPreferences.getString("userName", "");
        String role = sharedPreferences.getString("role", "");

        if (!id.equals("")) {

            Preferences.LOGGED_USER_ID = id;
            Preferences.LOGGED_USER_NAME = userName;
            Preferences.LOGGED_USER_TYPE = role;

            if (role.equals("AppUser")) {
                Intent intent = new Intent(MainActivity.this, DashboardActivity.class);
                startActivity(intent);
                finish();
            } else {
                Intent intent = new Intent(MainActivity.this, AmbulanceDashboardActivity.class);
                startActivity(intent);
                finish();
            }



        } else {

            Preferences.LOGGED_USER_ID = "";
            Preferences.LOGGED_USER_NAME = "";
            Preferences.LOGGED_USER_TYPE = "";

            Intent intent = new Intent(MainActivity.this, SignInActivity.class);
            startActivity(intent);
            finish();

        }

    }

}
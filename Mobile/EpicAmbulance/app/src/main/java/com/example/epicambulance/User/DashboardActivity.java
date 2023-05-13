package com.example.epicambulance.User;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.MainActivity;
import com.example.epicambulance.R;

public class DashboardActivity extends AppCompatActivity {

    private LinearLayout btnHospitals, btnSearch, btnBookings, btnProfile, btnLogout;

    private SharedPreferences sharedPreferences;
    private SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        btnHospitals = (LinearLayout) this.findViewById(R.id.btnHospitals);
        btnSearch = (LinearLayout) this.findViewById(R.id.btnSearch);
        btnBookings = (LinearLayout) this.findViewById(R.id.btnBookings);
        btnProfile = (LinearLayout) this.findViewById(R.id.btnProfile);
        btnLogout = (LinearLayout) this.findViewById(R.id.btnLogout);

//        For shared preferences
        sharedPreferences = getSharedPreferences("Login", MODE_PRIVATE);
        editor = sharedPreferences.edit();

        btnHospitals.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(DashboardActivity.this, HospitalsActivity.class);
                startActivity(intent);

            }
        });

//        btnSearch.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//
//                Intent intent = new Intent(DashboardActivity.this, SearchActivity.class);
//                startActivity(intent);
//
//            }
//        });

//        btnBookings.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//
//                Intent intent = new Intent(DashboardActivity.this, InquiriesActivity.class);
//                startActivity(intent);
//
//            }
//        });

        btnProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(DashboardActivity.this, ProfileActivity.class);
                startActivity(intent);

            }
        });

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Preferences.LOGGED_USER_ID = "";
                Preferences.LOGGED_USER_NAME = "";
                Preferences.LOGGED_USER_TYPE = "";

                editor.clear();
                editor.apply();

                Intent intent = new Intent(DashboardActivity.this, MainActivity.class);
                startActivity(intent);
                finishAffinity();

            }
        });

    }
}
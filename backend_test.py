#!/usr/bin/env python3
"""
Backend API Testing for Redweyne's Sci-Fi Portfolio Contact Form
Tests the contact form API endpoints as specified in the review request.
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from frontend environment
BACKEND_URL = "https://cosmic-portfolio-32.preview.emergentagent.com/api"

def test_health_check():
    """Test GET /api/ - Health check endpoint"""
    print("\n=== Testing Health Check Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "Hello World" in data["message"]:
                print("✅ Health check passed")
                return True
            else:
                print("❌ Health check failed - unexpected response format")
                return False
        else:
            print(f"❌ Health check failed - expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check failed with exception: {e}")
        return False

def test_valid_contact_submission():
    """Test POST /api/contact with valid data"""
    print("\n=== Testing Valid Contact Form Submission ===")
    
    test_data = {
        "name": "John Doe",
        "email": "john@example.com", 
        "message": "I want to hire you for a project!"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 201:
            data = response.json()
            required_fields = ["id", "name", "email", "message", "created_at", "status"]
            
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                print(f"❌ Missing required fields: {missing_fields}")
                return False, None
            
            # Verify data integrity
            if (data["name"] == test_data["name"] and 
                data["email"] == test_data["email"] and 
                data["message"] == test_data["message"] and
                data["status"] == "received"):
                print("✅ Valid contact submission passed")
                return True, data["id"]
            else:
                print("❌ Data integrity check failed")
                return False, None
        else:
            print(f"❌ Expected 201, got {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"❌ Valid contact submission failed with exception: {e}")
        return False, None

def test_invalid_email_validation():
    """Test POST /api/contact with invalid email"""
    print("\n=== Testing Invalid Email Validation ===")
    
    test_data = {
        "name": "Test User",
        "email": "invalid-email",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 422:
            print("✅ Invalid email validation passed")
            return True
        else:
            print(f"❌ Expected 422 validation error, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Invalid email validation test failed with exception: {e}")
        return False

def test_empty_name_validation():
    """Test POST /api/contact with empty name"""
    print("\n=== Testing Empty Name Validation ===")
    
    test_data = {
        "name": "",
        "email": "test@test.com",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 422:
            print("✅ Empty name validation passed")
            return True
        else:
            print(f"❌ Expected 422 validation error, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Empty name validation test failed with exception: {e}")
        return False

def test_get_contact_messages():
    """Test GET /api/contact - Retrieve all contact messages"""
    print("\n=== Testing Get Contact Messages ===")
    
    try:
        response = requests.get(f"{BACKEND_URL}/contact")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ Get contact messages passed - retrieved {len(data)} messages")
                return True
            else:
                print("❌ Expected array response")
                return False
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Get contact messages failed with exception: {e}")
        return False

def run_all_tests():
    """Run all contact form API tests"""
    print("🚀 Starting Contact Form API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    
    test_results = []
    
    # Test 1: Health check
    test_results.append(("Health Check", test_health_check()))
    
    # Test 2: Valid contact submission
    valid_submission_result, contact_id = test_valid_contact_submission()
    test_results.append(("Valid Contact Submission", valid_submission_result))
    
    # Test 3: Invalid email validation
    test_results.append(("Invalid Email Validation", test_invalid_email_validation()))
    
    # Test 4: Empty name validation
    test_results.append(("Empty Name Validation", test_empty_name_validation()))
    
    # Test 5: Get contact messages
    test_results.append(("Get Contact Messages", test_get_contact_messages()))
    
    # Summary
    print("\n" + "="*50)
    print("TEST SUMMARY")
    print("="*50)
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(test_results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All tests passed!")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
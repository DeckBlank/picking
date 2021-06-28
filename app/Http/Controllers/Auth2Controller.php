<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthControllerSocialite;
use Google_Client;
use Google_Service_Drive;

class Auth2Controller extends Controller
{
    //

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except(['logout','handleProviderCallback']);
    }

    public function redirectToProvider()
{
    return Socialite::driver('google')->redirect();
}

public function handleProviderCallback(Request $req)
  {
    $token = $req->token;
    //return response()->json($token);
    $client = new Google_Client();  // Specify the CLIENT_ID of the app that accesses the backend
    $client->setApplicationName('YOUR APPLICATION NAME');
$client->setClientId(config('recaptcha.google_id'));
$client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));

    // $client->addScope("email");
    //  $_SESSION['id_token_token'] = $token;
    //  $client->setAccessToken($_SESSION['id_token_token']);
    $payload = $client->verifyIdToken($token);
    if ($payload) {
      $userEmail = $payload['email'];
      $user = User::where('email', $userEmail)->first();
      if($user){
          return $this->retornar($user);
      } else {
          $user = User::create([
              'name' => $payload['given_name'],
              //'lastName' => $payload['family_name'],
              'email' => $payload['email'],
              'password' => '=)',
              //'google_id' => $payload['sub'],//Hash::make('0000'),
              //'avatar' => $payload['picture'],
              //'avatar_original' => $payload['picture'],
          ]);
          return $this->retornar($user);
      }
    } else {
      return response()->json('error');
    }

}

public function retornar ($user){
  $retornar = [
    "token"=>'$token',
    "user"=>["avatar"=>$user->avatar,
              "name"=>$user->name,
              "email"=>$user->email]
  ];
  return $retornar;
  // $token = app('App\Http\Controllers\AuthControllerSocialite')->login($user);
  // $retornar = [
  //   "token"=>$token,
  //   "data"=>["avatar"=>$user->avatar,
  //             "name"=>$user->name,
  //             "email"=>$user->email]
  // ];
  // return $retornar;
}

}

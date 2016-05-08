require 'spec_helper'

describe "posts api tests", :type => :controller do
  before do
    @post = Post.create(:title => 'First post', :content => "First Content")
  end
  describe "GET json /posts" do
    it "should show a json object" do
      header "Content-Type", "application/json"
      header "Accept", "application/json"
      request "blog/posts"
      expect(last_request.env["CONTENT_TYPE"]).to eq("application/json")
      expect(last_response.body).to include(@post.title)
    end
  end
end

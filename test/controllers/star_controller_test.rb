require 'test_helper'

class StarControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get star_index_url
    assert_response :success
  end

end
